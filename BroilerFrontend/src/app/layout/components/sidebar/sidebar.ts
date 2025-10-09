import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ChickenIcon } from '../../../components/icons/chicken-icon/chicken-icon';

interface MenuItem {
  icon: string;
  label: string;
  urlSuffix: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, MatIconModule, ChickenIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      icon: 'group',
      label: 'Users',
      urlSuffix: '/',
    },
    {
      icon: 'receipt',
      label: 'Purchases',
      urlSuffix: '/purchases',
    },
    {
      icon: 'business_center',
      label: 'Products',
      urlSuffix: '/products',
    },
    {
      icon: 'emoji_events',
      label: 'Leaderboard',
      urlSuffix: '/leaderboard',
    },
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}
