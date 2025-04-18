import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  order: defineTable({
    userId: v.string(),
    address: v.string(),
    pickupDate: v.string(),
    pickupTime: v.string(),
    serviceType: v.string(),
    laundryPreference: v.array(v.string()),
    specialInstruction: v.optional(v.string()),
    // status
    status:v.union(
        v.literal("pending"),
        v.literal("picked-up"),
        v.literal("in-cleaning"),
        v.literal("ready-delivery"),
        v.literal("delivered"),
    ),  
    // items
    shirts: v.optional(v.number()),
    pants: v.optional(v.number()),
    dresses: v.optional(v.number()),
    bedding: v.optional(v.number()),
  }),  
  pickUp:defineTable({
    userId: v.string(),
    pickupDate: v.string(),
    pickupTime: v.string(),
  }),
  subscription:defineTable({
    userId: v.string(),    
    status:v.union(
        v.literal("pay-as-you-go"),
        v.literal("weekly"),
        v.literal("family"),        
    ),  
  }),
});