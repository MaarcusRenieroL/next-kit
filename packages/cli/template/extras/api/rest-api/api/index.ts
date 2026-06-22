// @ts-nocheck
import { NextResponse } from "next/server";

const items: { id: number; name: string }[] = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "Items fetched successfully",
      data: items,
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }

    const newItem = { id: items.length + 1, name };
    items.push(newItem);

    return NextResponse.json(
      {
        success: true,
        message: "Item added successfully",
        data: newItem,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request payload" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name } = await req.json();

    if (!id || !name) {
      return NextResponse.json({ success: false, message: "ID and name are required" }, { status: 400 });
    }

    const existingItem = items.find((item) => item.id === id);

    if (!existingItem) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    existingItem.name = name;

    return NextResponse.json(
      {
        success: true,
        message: "Item updated successfully",
        data: existingItem,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request payload" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    const deletedItem = items.splice(itemIndex, 1);

    return NextResponse.json(
      {
        success: true,
        message: "Item deleted successfully",
        data: deletedItem[0],
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request payload" }, { status: 400 });
  }
}
