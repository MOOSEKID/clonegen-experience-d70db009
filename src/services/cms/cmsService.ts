
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  parent_id?: string | null;
  type: 'custom' | 'system' | 'dynamic';
  source_path?: string | null;
  visible: boolean;
  meta_description?: string | null;
  meta_keywords?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface NavItem {
  id: string;
  label: string;
  linked_page_id?: string | null;
  external_url?: string | null;
  nav_group?: string | null;
  order_index: number;
  visible: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ContentBlock {
  id: string;
  page_id: string;
  type: string;
  order_index: number;
  content: any;
  is_editable: boolean;
  is_dynamic: boolean;
  dynamic_source?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const cmsService = {
  // Page management
  async getPages(): Promise<CmsPage[]> {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .order("created_at");

      if (error) {
        console.error("Error fetching CMS pages:", error);
        throw error;
      }

      return data as CmsPage[];
    } catch (error: any) {
      toast.error(`Failed to fetch pages: ${error.message}`);
      console.error("Error in getPages:", error);
      return [];
    }
  },

  async getPageBySlug(slug: string): Promise<CmsPage | null> {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows returned
          return null;
        }
        console.error("Error fetching CMS page by slug:", error);
        throw error;
      }

      return data as CmsPage;
    } catch (error: any) {
      console.error("Error in getPageBySlug:", error);
      return null;
    }
  },

  async createPage(page: Omit<CmsPage, 'id' | 'created_at' | 'updated_at'>): Promise<CmsPage | null> {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .insert([page])
        .select()
        .single();

      if (error) {
        console.error("Error creating CMS page:", error);
        toast.error(`Failed to create page: ${error.message}`);
        throw error;
      }

      toast.success("Page created successfully");
      return data as CmsPage;
    } catch (error: any) {
      console.error("Error in createPage:", error);
      return null;
    }
  },

  async updatePage(id: string, page: Partial<Omit<CmsPage, 'id' | 'created_at' | 'updated_at'>>): Promise<CmsPage | null> {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .update(page)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating CMS page:", error);
        toast.error(`Failed to update page: ${error.message}`);
        throw error;
      }

      toast.success("Page updated successfully");
      return data as CmsPage;
    } catch (error: any) {
      console.error("Error in updatePage:", error);
      return null;
    }
  },

  async deletePage(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("cms_pages")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting CMS page:", error);
        toast.error(`Failed to delete page: ${error.message}`);
        throw error;
      }

      toast.success("Page deleted successfully");
      return true;
    } catch (error: any) {
      console.error("Error in deletePage:", error);
      return false;
    }
  },

  // Navigation management
  async getNavItems(): Promise<NavItem[]> {
    try {
      const { data, error } = await supabase
        .from("cms_nav_items")
        .select("*, linked_page:cms_pages(slug, title)")
        .order("order_index");

      if (error) {
        console.error("Error fetching nav items:", error);
        throw error;
      }

      return data as NavItem[];
    } catch (error: any) {
      toast.error(`Failed to fetch navigation items: ${error.message}`);
      console.error("Error in getNavItems:", error);
      return [];
    }
  },

  async createNavItem(navItem: Omit<NavItem, 'id' | 'created_at' | 'updated_at'>): Promise<NavItem | null> {
    try {
      const { data, error } = await supabase
        .from("cms_nav_items")
        .insert([navItem])
        .select()
        .single();

      if (error) {
        console.error("Error creating nav item:", error);
        toast.error(`Failed to create navigation item: ${error.message}`);
        throw error;
      }

      toast.success("Navigation item created successfully");
      return data as NavItem;
    } catch (error: any) {
      console.error("Error in createNavItem:", error);
      return null;
    }
  },

  async updateNavItem(id: string, navItem: Partial<Omit<NavItem, 'id' | 'created_at' | 'updated_at'>>): Promise<NavItem | null> {
    try {
      const { data, error } = await supabase
        .from("cms_nav_items")
        .update(navItem)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating nav item:", error);
        toast.error(`Failed to update navigation item: ${error.message}`);
        throw error;
      }

      toast.success("Navigation item updated successfully");
      return data as NavItem;
    } catch (error: any) {
      console.error("Error in updateNavItem:", error);
      return null;
    }
  },

  async deleteNavItem(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("cms_nav_items")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting nav item:", error);
        toast.error(`Failed to delete navigation item: ${error.message}`);
        throw error;
      }

      toast.success("Navigation item deleted successfully");
      return true;
    } catch (error: any) {
      console.error("Error in deleteNavItem:", error);
      return false;
    }
  },

  // Content blocks
  async getContentBlocks(pageId: string): Promise<ContentBlock[]> {
    try {
      const { data, error } = await supabase
        .from("cms_content_blocks")
        .select("*")
        .eq("page_id", pageId)
        .order("order_index");

      if (error) {
        console.error("Error fetching content blocks:", error);
        throw error;
      }

      return data as ContentBlock[];
    } catch (error: any) {
      console.error("Error in getContentBlocks:", error);
      toast.error(`Failed to fetch content blocks: ${error.message}`);
      return [];
    }
  },

  async createContentBlock(block: Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>): Promise<ContentBlock | null> {
    try {
      const { data, error } = await supabase
        .from("cms_content_blocks")
        .insert([block])
        .select()
        .single();

      if (error) {
        console.error("Error creating content block:", error);
        toast.error(`Failed to create content block: ${error.message}`);
        throw error;
      }

      return data as ContentBlock;
    } catch (error: any) {
      console.error("Error in createContentBlock:", error);
      return null;
    }
  },

  async updateContentBlock(id: string, block: Partial<Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>>): Promise<ContentBlock | null> {
    try {
      const { data, error } = await supabase
        .from("cms_content_blocks")
        .update(block)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating content block:", error);
        toast.error(`Failed to update content block: ${error.message}`);
        throw error;
      }

      return data as ContentBlock;
    } catch (error: any) {
      console.error("Error in updateContentBlock:", error);
      return null;
    }
  },

  async deleteContentBlock(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("cms_content_blocks")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting content block:", error);
        toast.error(`Failed to delete content block: ${error.message}`);
        throw error;
      }

      return true;
    } catch (error: any) {
      console.error("Error in deleteContentBlock:", error);
      return false;
    }
  },

  async reorderNavItems(items: { id: string; order_index: number }[]): Promise<boolean> {
    try {
      const promises = items.map(item => 
        supabase
          .from("cms_nav_items")
          .update({ order_index: item.order_index })
          .eq("id", item.id)
      );
      
      await Promise.all(promises);
      toast.success("Navigation order updated");
      return true;
    } catch (error: any) {
      console.error("Error in reorderNavItems:", error);
      toast.error(`Failed to reorder navigation: ${error.message}`);
      return false;
    }
  },

  async reorderContentBlocks(items: { id: string; order_index: number }[]): Promise<boolean> {
    try {
      const promises = items.map(item => 
        supabase
          .from("cms_content_blocks")
          .update({ order_index: item.order_index })
          .eq("id", item.id)
      );
      
      await Promise.all(promises);
      return true;
    } catch (error: any) {
      console.error("Error in reorderContentBlocks:", error);
      toast.error(`Failed to reorder content blocks: ${error.message}`);
      return false;
    }
  }
};
