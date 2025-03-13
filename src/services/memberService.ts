
import { supabase } from '@/integrations/supabase/client';
import { MemberInfo } from '@/types/classTypes';

// Get members who are not enrolled or waitlisted in the class
export const getAvailableMembers = async (
  enrolledMembers: MemberInfo[], 
  waitlistMembers: MemberInfo[],
  searchTerm: string = ''
): Promise<MemberInfo[]> => {
  const enrolledIds = new Set(enrolledMembers.map(m => m.id));
  const waitlistIds = new Set(waitlistMembers.map(m => m.id));
  
  try {
    // Get members from Supabase
    let query = supabase
      .from('members')
      .select('id, name, email, phone, membershipType, status')
      .eq('status', 'Active');
    
    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching members:', error);
      return [];
    }
    
    // Convert Supabase members to MemberInfo format and filter out enrolled/waitlisted
    return data
      .map(member => ({
        id: member.id,
        name: member.name,
        email: member.email,
        phone: member.phone || '',
        membershipType: member.membershipType
      }))
      .filter(member => 
        !enrolledIds.has(member.id) && 
        !waitlistIds.has(member.id)
      );
  } catch (error) {
    console.error('Error in getAvailableMembers:', error);
    return [];
  }
};

// Add new member service functions
export const fetchMembers = async () => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching members:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchMembers:', error);
    return [];
  }
};

export const addMember = async (memberData) => {
  try {
    const { data, error } = await supabase
      .from('members')
      .insert([memberData])
      .select();
      
    if (error) {
      console.error('Error adding member:', error);
      return null;
    }
    
    return data[0];
  } catch (error) {
    console.error('Error in addMember:', error);
    return null;
  }
};

export const updateMember = async (id, memberData) => {
  try {
    const { data, error } = await supabase
      .from('members')
      .update(memberData)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating member:', error);
      return null;
    }
    
    return data[0];
  } catch (error) {
    console.error('Error in updateMember:', error);
    return null;
  }
};

export const deleteMember = async (id) => {
  try {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting member:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteMember:', error);
    return false;
  }
};

export const updateMemberStatus = async (id, newStatus) => {
  try {
    const { data, error } = await supabase
      .from('members')
      .update({ status: newStatus })
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating member status:', error);
      return null;
    }
    
    return data[0];
  } catch (error) {
    console.error('Error in updateMemberStatus:', error);
    return null;
  }
};
