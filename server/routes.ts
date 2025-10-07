import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCallSchema, insertLeadSchema, insertContactSchema, insertScheduledCallSchema, insertApiKeySchema } from "@shared/schema";
import bcrypt from "bcrypt";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, name, isDemo } = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        name: name || null,
        isDemo: isDemo || false,
        subscriptionTier: isDemo ? "trial" : "trial",
        subscriptionStatus: "active",
      });

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Login failed" });
        }
        const { password: _, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Login failed" });
        }
        const { password: _, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/auth/demo", async (req, res) => {
    try {
      const demoEmail = `demo_${Date.now()}@demo.com`;
      const user = await storage.createUser({
        email: demoEmail,
        password: await bcrypt.hash("demo", 10),
        name: "Demo User",
        isDemo: true,
        subscriptionTier: "trial",
        subscriptionStatus: "active",
      });

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Login failed" });
        }
        const { password: _, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    res.json(req.user);
  });

  // Call routes
  app.get("/api/calls", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const calls = await storage.getCalls(req.user.id);
      res.json(calls);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/calls", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const callData = insertCallSchema.parse({ ...req.body, userId: req.user.id });
      const call = await storage.createCall(callData);
      res.json(call);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/calls/:id", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const call = await storage.updateCall(req.params.id, req.body);
      if (!call) {
        return res.status(404).json({ error: "Call not found" });
      }
      res.json(call);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Lead routes
  app.get("/api/leads", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const leads = await storage.getLeads(req.user.id);
      res.json(leads);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/leads", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const leadData = insertLeadSchema.parse({ ...req.body, userId: req.user.id });
      const lead = await storage.createLead(leadData);
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/leads/:id", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const lead = await storage.updateLead(req.params.id, req.body);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      res.json(lead);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Contact routes
  app.get("/api/contacts", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const contacts = await storage.getContacts(req.user.id);
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const contactData = insertContactSchema.parse({ ...req.body, userId: req.user.id });
      const contact = await storage.createContact(contactData);
      res.json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/contacts/:id", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const contact = await storage.updateContact(req.params.id, req.body);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Scheduled Call routes
  app.get("/api/scheduled-calls", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const scheduledCalls = await storage.getScheduledCalls(req.user.id);
      res.json(scheduledCalls);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/scheduled-calls", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const scheduledCallData = insertScheduledCallSchema.parse({ ...req.body, userId: req.user.id });
      const scheduledCall = await storage.createScheduledCall(scheduledCallData);
      res.json(scheduledCall);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/scheduled-calls/:id", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const scheduledCall = await storage.updateScheduledCall(req.params.id, req.body);
      if (!scheduledCall) {
        return res.status(404).json({ error: "Scheduled call not found" });
      }
      res.json(scheduledCall);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/scheduled-calls/:id", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      await storage.deleteScheduledCall(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API Key routes
  app.get("/api/keys", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const keys = await storage.getApiKeys(req.user.id);
      res.json(keys);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/keys", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const keyData = insertApiKeySchema.parse({ ...req.body, userId: req.user.id });
      const key = await storage.createApiKey(keyData);
      res.json(key);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Dashboard stats
  app.get("/api/stats", async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    try {
      const calls = await storage.getCalls(req.user.id);
      const leads = await storage.getLeads(req.user.id);
      
      const totalCalls = calls.length;
      const completedCalls = calls.filter(c => c.status === "completed").length;
      const avgDuration = calls.length > 0
        ? calls.reduce((acc, call) => {
            const [min, sec] = (call.duration || "0:00").split(":").map(Number);
            return acc + min * 60 + sec;
          }, 0) / calls.length
        : 0;

      const successRate = totalCalls > 0 ? (completedCalls / totalCalls) * 100 : 0;
      const activeLeads = leads.filter(l => l.status === "hot" || l.status === "warm").length;

      res.json({
        totalCalls,
        successRate: Math.round(successRate),
        avgDuration: Math.round(avgDuration),
        activeLeads,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
