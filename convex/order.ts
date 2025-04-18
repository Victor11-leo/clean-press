import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTask = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const res = await ctx.db.insert("order",{
        userId:args.userId,
        address:args.address,
        pickupDate:args.pickupDate,
        pickupTime:args.pickupTime,
        serviceType:args.serviceType,
        laundryPreference:args.laundryPreference,
        specialInstruction:args.specialInstruction,
        status:args.status,
        shirts:args.shirts,
        pants:args.pants,
        dresses:args.dresses,
        bedding:args.bedding,
    });
    return res
  },
});

export const updateTask = mutation({
    args: { 
        id: v.id("order"),
        status:v.union(
            v.literal("pending"),
            v.literal("picked-up"),
            v.literal("in-cleaning"),
            v.literal("ready-delivery"),
            v.literal("delivered"),
        ),  
    },
    handler: async (ctx, args) => {
      const { id } = args;
      console.log(await ctx.db.get(id));
            
      await ctx.db.patch(id, {         
        status: args.status 
        });      
    },
  });

  export const deleteTask = mutation({
    args: { id: v.id("order") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
  });