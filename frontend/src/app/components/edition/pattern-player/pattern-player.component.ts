import { SelectionService } from 'src/app/services/control/selection.service';
import { Sequence } from 'src/app/models/entity/Sequence.model';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pattern-player',
  templateUrl: './pattern-player.component.html',
  styleUrls: ['./pattern-player.component.scss'],
})
export class PatternPlayerComponent implements OnInit {
  @Input() patterns: Pattern[];
  @Input() sequence: Sequence;

  constructor(private selectionService: SelectionService) {}

  ngOnInit(): void {}

  getPatterns(): Pattern[] {
    // TODO: sort by num
    const patternsToDisplay = [];

    this.patterns.forEach((pattern: Pattern) => {
      if (pattern.bank === this.selectionService.getSelectedBank()) {
        patternsToDisplay.push(pattern);
      }
    });

    return patternsToDisplay;
  }

  onClickPattern(pattern: Pattern): void {}
}
