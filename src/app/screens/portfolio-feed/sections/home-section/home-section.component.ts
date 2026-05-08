import { Component, inject } from '@angular/core';
import { TypingEffectService } from 'src/app/service/typing-effect.service';

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.scss']
})
export class HomeSectionComponent {
  typingEffectService = inject(TypingEffectService);

  profession: string = "";

  requestsExample = `import math\n\nn = int(input(“Type a number: ”))\nsqrt_n = math.sqrt(n)\nprint( f”sqrt of {n} = {sqrt_n}” )`;
  todoList = `<p>Todo:</p>\n<ul>\n    <li>Laundry</li>\n    <li>Shopping</li>\n    <li>Fixes</li>\n</ul>`;
  product = `let n = 1;\nfor (let i=0; i < 10; i++) {   n *= i;\n}\nconsole.log(\`n: \${n}\`);`
  cssExample = `.title {\n    font-size: 7em;\n    font-family: Inter, sans-serif;\n}`

  yearsOfExperience: number = 0;

  constructor() {
    const words = ["FRONT-END", "AUTOMATION", "FULLSTACK"];

    this.typingEffectService
        .typedWord(words)
        .subscribe((word) => this.profession = word);

    this.yearsOfExperience = this.getYearsOfExperience();
  }

  getYearsOfExperience() {
    return new Date().getFullYear() - 2020;
  }
}
