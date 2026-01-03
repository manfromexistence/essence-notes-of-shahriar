import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Pencil, Trash2, GripVertical, ExternalLink } from "lucide-react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface MenuItem {
    id: number;
    label: string;
    url: string;
    target: string;
    order: number;
    is_active: boolean;
    parent_id: number | null;
    icon: string | null;
    children?: MenuItem[];
}

interface Props {
    menuItems: MenuItem[];
}

function SortableRow({ item, onDelete, onToggleStatus }: { 
    item: MenuItem; 
    onDelete: (id: number) => void;
    onToggleStatus: (id: number) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell>
                <button
                    className="cursor-grab touch-none p-1 hover:bg-muted rounded"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                </button>
            </TableCell>
            <TableCell className="font-medium">{item.label}</TableCell>
            <TableCell>
                <code className="text-sm bg-muted px-2 py-1 rounded">{item.url}</code>
            </TableCell>
            <TableCell>
                {item.target === "_blank" ? (
                    <span className="flex items-center gap-1 text-muted-foreground">
                        <ExternalLink className="h-3 w-3" />
                        New Tab
                    </span>
                ) : (
                    "Same Tab"
                )}
            </TableCell>
            <TableCell>
                <Badge 
                    variant={item.is_active ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => onToggleStatus(item.id)}
                >
                    {item.is_active ? "Active" : "Inactive"}
                </Badge>
            </TableCell>
            <TableCell>{item.order}</TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/admin/menu-items/${item.id}/edit`}>
                            <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => onDelete(item.id)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}

export default function MenuItemsIndex({ menuItems }: Props) {
    const [items, setItems] = useState(menuItems);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this menu item?")) {
            router.delete(`/admin/menu-items/${id}`, {
                onSuccess: () => toast.success("Menu item deleted successfully"),
            });
        }
    };

    const handleToggleStatus = (id: number) => {
        router.post(`/admin/menu-items/${id}/toggle-status`, {}, {
            onSuccess: () => toast.success("Menu item status updated"),
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);
                
                // Update order on server
                const reorderedItems = newItems.map((item, index) => ({
                    id: item.id,
                    order: index,
                }));

                fetch("/admin/menu-items/reorder", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || "",
                    },
                    body: JSON.stringify({ items: reorderedItems }),
                }).then((response) => {
                    if (response.ok) {
                        toast.success("Menu items reordered");
                    } else {
                        toast.error("Failed to reorder menu items");
                    }
                });

                return newItems;
            });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Menu Items" />

                <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Menu Items</h1>
                            <p className="text-muted-foreground">
                                Manage navigation menu items. Drag to reorder.
                            </p>
                        </div>
                        <Link href="/admin/menu-items/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Menu Item
                            </Button>
                        </Link>
                    </div>

                    <div className="rounded-md border">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12"></TableHead>
                                        <TableHead>Label</TableHead>
                                        <TableHead>URL</TableHead>
                                        <TableHead>Target</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                No menu items found. Create your first one!
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <SortableContext
                                            items={items.map((item) => item.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {items.map((item) => (
                                                <SortableRow
                                                    key={item.id}
                                                    item={item}
                                                    onDelete={handleDelete}
                                                    onToggleStatus={handleToggleStatus}
                                                />
                                            ))}
                                        </SortableContext>
                                    )}
                                </TableBody>
                            </Table>
                        </DndContext>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
