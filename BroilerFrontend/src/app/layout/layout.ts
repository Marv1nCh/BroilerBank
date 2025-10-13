import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, CommonModule, RouterOutlet, MatButtonModule, MatIconModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  isSidebarCollapsed = false;
  isDarkMode = false;

  ngOnInit(): void {
    const isDeviceStandardDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = isDeviceStandardDarkMode;
    if (isDeviceStandardDarkMode) document.body.classList.toggle('dark-mode');
  }

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  onToggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
  }
}
