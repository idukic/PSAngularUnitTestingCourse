import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Hero } from '../hero';
import { HeroComponent } from '../hero/hero.component';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent (deep)', () => {
    let fixture: ComponentFixture<HeroesComponent>;

    let mockHeroService;
    let HEROES;

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
                HeroComponent
            ],
            providers: [
                // when someone asked for HeroService, use mockHeroService
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        // Arrange
        fixture = TestBed.createComponent(HeroesComponent);

    });

    it('should render each Hero as a HeroComponent', () => {
        // Act
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // Assert
        expect(heroComponentDEs.length).toEqual(3);
        expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('Dr IQ');

        // check if hero obj equal to object for HEROES array
        for (let i = 0; i < heroComponentDEs.length; i++) {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }

    });

});
