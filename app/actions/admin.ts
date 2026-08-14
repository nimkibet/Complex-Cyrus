"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function getServices() {
  return await prisma.service.findMany({
    include: {
      materials: {
        orderBy: { description: 'asc' }
      }
    },
    orderBy: { name: 'asc' }
  });
}

export async function updateLabourCost(serviceId: string, newCost: number) {
  try {
    await prisma.service.update({
      where: { id: serviceId },
      data: { labourCost: newCost }
    });
    revalidatePath("/admin/pricing");
    revalidatePath("/"); // revalidate homepage if necessary
    return { success: true };
  } catch (error) {
    console.error("Failed to update labour cost:", error);
    return { success: false, error: "Failed to update" };
  }
}

export async function updateMaterialPrice(materialId: string, newPrice: number) {
  try {
    await prisma.serviceMaterial.update({
      where: { id: materialId },
      data: { unitPrice: newPrice }
    });
    revalidatePath("/admin/pricing");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update material price:", error);
    return { success: false, error: "Failed to update" };
  }
}
