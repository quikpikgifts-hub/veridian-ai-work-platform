import { clsx, type ClassValue } from 'clsx';
import type { SeverityLevel, IncidentStatus } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });
}

export function formatDateTime(iso: string): string {
  return `${formatDate(iso)} ${formatTime(iso)}`;
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

export const severityConfig: Record<SeverityLevel, { label: string; color: string; bg: string; border: string }> = {
  critical: { label: 'Critical', color: '#E74C3C', bg: 'rgba(231,76,60,0.12)', border: 'rgba(231,76,60,0.35)' },
  high:     { label: 'High',     color: '#E67E22', bg: 'rgba(230,126,34,0.12)', border: 'rgba(230,126,34,0.35)' },
  medium:   { label: 'Medium',   color: '#F1C40F', bg: 'rgba(241,196,15,0.12)', border: 'rgba(241,196,15,0.35)' },
  low:      { label: 'Low',      color: '#2ECC71', bg: 'rgba(46,204,113,0.12)', border: 'rgba(46,204,113,0.35)' },
};

export const statusConfig: Record<IncidentStatus, { label: string; color: string; bg: string }> = {
  active:        { label: 'Active',        color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
  investigating: { label: 'Investigating', color: '#E67E22', bg: 'rgba(230,126,34,0.12)' },
  contained:     { label: 'Contained',     color: '#3498DB', bg: 'rgba(52,152,219,0.12)' },
  resolved:      { label: 'Resolved',      color: '#2ECC71', bg: 'rgba(46,204,113,0.12)' },
};
