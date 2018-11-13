import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent (shallow)', () => {
    let fixture: ComponentFixture<HeroesComponent>;

    let mockHeroService;
    let HEROES;

    // mock child component
    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
    }

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Dr IQ', strength: 4 },
            { id: 2, name: 'Magma', strength: 18 },
            { id: 3, name: 'Tornado', strength: 15 }
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                // when someone asked for HeroService, use mockHeroService
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);

    });

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });

});
