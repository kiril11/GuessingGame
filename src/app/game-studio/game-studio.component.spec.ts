import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStudioComponent } from './game-studio.component';

describe('GameStudioComponent', () => {
  let component: GameStudioComponent;
  let fixture: ComponentFixture<GameStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
