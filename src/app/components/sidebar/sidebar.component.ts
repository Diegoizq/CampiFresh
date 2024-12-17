import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    @Output() sectionChange = new EventEmitter<string>();
    isActive = false;
    currentSection = 'productos';

    toggleSidebar() {
      this.isActive = !this.isActive;
    }

    changeSection(section: string) {
      this.currentSection = section;
      this.sectionChange.emit(section);
    }

    isCurrentSection(section: string): boolean {
      return this.currentSection === section;
    }

}
