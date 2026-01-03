import { FormEvent } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

interface MenuItem {
    id: number;
    label: string;
    url: string;
    target: string;
    order: number;
    is_active: boolean;
    parent_id: number | null;
    icon: string | null;
}

interface ParentOption {
    id: number;
    label: string;
}

interface Props {
    menuItem: MenuItem;
    parentOptions: ParentOption[];
}

export default function EditMenuItem({ menuItem, parentOptions }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        label: menuItem.label || "",
        url: menuItem.url || "",
        target: menuItem.target || "_self",
        order: menuItem.order || 0,
        is_active: menuItem.is_active ?? true,
        parent_id: menuItem.parent_id?.toString() || "",
        icon: menuItem.icon || "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/menu-items/${menuItem.id}`, {
            onSuccess: () => toast.success("Menu item updated successfully"),
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <Head title="Edit Menu Item" />

                <div className="container mx-auto py-8 px-4 max-w-2xl">
                    <div className="mb-8">
                        <Link
                            href="/admin/menu-items"
                            className="flex items-center text-muted-foreground hover:text-foreground mb-4"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Menu Items
                        </Link>
                        <h1 className="text-3xl font-bold text-foreground">Edit Menu Item</h1>
                        <p className="text-muted-foreground mt-2">Update the menu item properties</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Menu Item Details</CardTitle>
                                <CardDescription>Configure the menu item properties</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="label">Label *</Label>
                                    <Input
                                        id="label"
                                        value={data.label}
                                        onChange={(e) => setData("label", e.target.value)}
                                        placeholder="e.g., Home, About, Contact"
                                        className="mt-1"
                                    />
                                    {errors.label && (
                                        <p className="text-sm text-destructive mt-1">{errors.label}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="url">URL *</Label>
                                    <Input
                                        id="url"
                                        value={data.url}
                                        onChange={(e) => setData("url", e.target.value)}
                                        placeholder="e.g., /home, /about, https://example.com"
                                        className="mt-1"
                                    />
                                    {errors.url && (
                                        <p className="text-sm text-destructive mt-1">{errors.url}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="target">Link Target</Label>
                                    <Select
                                        value={data.target}
                                        onValueChange={(value) => setData("target", value)}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select target" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="_self">Same Tab</SelectItem>
                                            <SelectItem value="_blank">New Tab</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="order">Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData("order", parseInt(e.target.value) || 0)}
                                        min={0}
                                        className="mt-1"
                                    />
                                    {errors.order && (
                                        <p className="text-sm text-destructive mt-1">{errors.order}</p>
                                    )}
                                </div>

                                {parentOptions.length > 0 && (
                                    <div>
                                        <Label htmlFor="parent_id">Parent Menu Item (Optional)</Label>
                                        <Select
                                            value={data.parent_id || "none"}
                                            onValueChange={(value) => setData("parent_id", value === "none" ? "" : value)}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="No parent (root level)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">No parent (root level)</SelectItem>
                                                {parentOptions.map((option) => (
                                                    <SelectItem key={option.id} value={option.id.toString()}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="icon">Icon (Optional)</Label>
                                    <Input
                                        id="icon"
                                        value={data.icon}
                                        onChange={(e) => setData("icon", e.target.value)}
                                        placeholder="e.g., home, user, mail"
                                        className="mt-1"
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Icon name from Lucide icons (optional)
                                    </p>
                                </div>

                                <div className="flex items-center space-x-2 pt-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData("is_active", checked)}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Link href="/admin/menu-items">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
