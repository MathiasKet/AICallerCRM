import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import {
  type User,
  type InsertUser,
  type Call,
  type InsertCall,
  type Lead,
  type InsertLead,
  type Contact,
  type InsertContact,
  type ScheduledCall,
  type InsertScheduledCall,
  type ApiKey,
  type InsertApiKey,
  type Subscription,
  type InsertSubscription,
  users,
  calls,
  leads,
  contacts,
  scheduledCalls,
  apiKeys,
  subscriptions,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Call methods
  getCalls(userId: string): Promise<Call[]>;
  getCall(id: string): Promise<Call | undefined>;
  createCall(call: InsertCall): Promise<Call>;
  updateCall(id: string, call: Partial<InsertCall>): Promise<Call | undefined>;
  
  // Lead methods
  getLeads(userId: string): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  
  // Contact methods
  getContacts(userId: string): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact | undefined>;
  
  // Scheduled Call methods
  getScheduledCalls(userId: string): Promise<ScheduledCall[]>;
  getScheduledCall(id: string): Promise<ScheduledCall | undefined>;
  createScheduledCall(scheduledCall: InsertScheduledCall): Promise<ScheduledCall>;
  updateScheduledCall(id: string, scheduledCall: Partial<InsertScheduledCall>): Promise<ScheduledCall | undefined>;
  deleteScheduledCall(id: string): Promise<void>;
  
  // API Key methods
  getApiKeys(userId: string): Promise<ApiKey[]>;
  getApiKey(userId: string, service: string): Promise<ApiKey | undefined>;
  createApiKey(apiKey: InsertApiKey): Promise<ApiKey>;
  updateApiKey(id: string, key: string): Promise<ApiKey | undefined>;
  
  // Subscription methods
  getSubscription(userId: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: string, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Call methods
  async getCalls(userId: string): Promise<Call[]> {
    return db.select().from(calls).where(eq(calls.userId, userId)).orderBy(desc(calls.createdAt));
  }

  async getCall(id: string): Promise<Call | undefined> {
    const result = await db.select().from(calls).where(eq(calls.id, id)).limit(1);
    return result[0];
  }

  async createCall(call: InsertCall): Promise<Call> {
    const result = await db.insert(calls).values(call).returning();
    return result[0];
  }

  async updateCall(id: string, call: Partial<InsertCall>): Promise<Call | undefined> {
    const result = await db.update(calls).set(call).where(eq(calls.id, id)).returning();
    return result[0];
  }

  // Lead methods
  async getLeads(userId: string): Promise<Lead[]> {
    return db.select().from(leads).where(eq(leads.userId, userId)).orderBy(desc(leads.createdAt));
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return result[0];
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const result = await db.insert(leads).values(lead).returning();
    return result[0];
  }

  async updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead | undefined> {
    const result = await db.update(leads).set(lead).where(eq(leads.id, id)).returning();
    return result[0];
  }

  // Contact methods
  async getContacts(userId: string): Promise<Contact[]> {
    return db.select().from(contacts).where(eq(contacts.userId, userId)).orderBy(desc(contacts.createdAt));
  }

  async getContact(id: string): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
    return result[0];
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(contact).returning();
    return result[0];
  }

  async updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact | undefined> {
    const result = await db.update(contacts).set(contact).where(eq(contacts.id, id)).returning();
    return result[0];
  }

  // Scheduled Call methods
  async getScheduledCalls(userId: string): Promise<ScheduledCall[]> {
    return db.select().from(scheduledCalls).where(eq(scheduledCalls.userId, userId)).orderBy(desc(scheduledCalls.scheduledTime));
  }

  async getScheduledCall(id: string): Promise<ScheduledCall | undefined> {
    const result = await db.select().from(scheduledCalls).where(eq(scheduledCalls.id, id)).limit(1);
    return result[0];
  }

  async createScheduledCall(scheduledCall: InsertScheduledCall): Promise<ScheduledCall> {
    const result = await db.insert(scheduledCalls).values(scheduledCall).returning();
    return result[0];
  }

  async updateScheduledCall(id: string, scheduledCall: Partial<InsertScheduledCall>): Promise<ScheduledCall | undefined> {
    const result = await db.update(scheduledCalls).set(scheduledCall).where(eq(scheduledCalls.id, id)).returning();
    return result[0];
  }

  async deleteScheduledCall(id: string): Promise<void> {
    await db.delete(scheduledCalls).where(eq(scheduledCalls.id, id));
  }

  // API Key methods
  async getApiKeys(userId: string): Promise<ApiKey[]> {
    return db.select().from(apiKeys).where(eq(apiKeys.userId, userId));
  }

  async getApiKey(userId: string, service: string): Promise<ApiKey | undefined> {
    const result = await db.select().from(apiKeys)
      .where(and(eq(apiKeys.userId, userId), eq(apiKeys.service, service)))
      .limit(1);
    return result[0];
  }

  async createApiKey(apiKey: InsertApiKey): Promise<ApiKey> {
    const result = await db.insert(apiKeys).values(apiKey).returning();
    return result[0];
  }

  async updateApiKey(id: string, key: string): Promise<ApiKey | undefined> {
    const result = await db.update(apiKeys).set({ key }).where(eq(apiKeys.id, id)).returning();
    return result[0];
  }

  // Subscription methods
  async getSubscription(userId: string): Promise<Subscription | undefined> {
    const result = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).limit(1);
    return result[0];
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const result = await db.insert(subscriptions).values(subscription).returning();
    return result[0];
  }

  async updateSubscription(id: string, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const result = await db.update(subscriptions).set(subscription).where(eq(subscriptions.id, id)).returning();
    return result[0];
  }
}

export const storage = new DbStorage();
