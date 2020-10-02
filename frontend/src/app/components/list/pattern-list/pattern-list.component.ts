import { Component, Input } from '@angular/core';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import { SelectionService } from 'src/app/services/control/selection.service';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss'],
})
export class PatternListComponent {
  @Input() patterns: Pattern[];

  constructor(private projectsService: SelectionService) {}

  onClickPattern(pattern: Pattern): void {
    this.projectsService.selectPattern(pattern);
  }

  isSelected(pattern: Pattern): boolean {
    return this.projectsService.getSelectedPattern() === pattern;
  }
}
