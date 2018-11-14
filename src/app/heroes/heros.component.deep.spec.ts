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

    /**
     * Triggering event on a subcomponent that will get raised to the parent component
     * HeroesComponent > HeroCompoennt
     */

    it(`should call "heroService.deleteHero" when the 
     Hero Component's delete button is clicked (1)`, () => {
            // check if called with correct hero, watch/spy and see if 'delete' method called
            spyOn(fixture.componentInstance, 'delete');

            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            fixture.detectChanges();

            // 1) handle all child components by creating a new variable that is collection of debug elements
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

            // 2) Click the button
            // create dummy object to stop propagation, when called, nothing will happen, 
            // this is OK as we just need code to be able to call stopPropagation to avoid erroring out
            heroComponents[0].query(By.css('button'))
                .triggerEventHandler('click', { stopPropagation: () => { } });

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

        });

    /**
     * Emitting Events from Children
     */
    it(`should call "heroService.deleteHero" when the 
        Hero Component's delete button is clicked (2)`, () => {
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));
            fixture.detectChanges();

            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

            // Grab compoennt instance, componnet class

            // let heroComponent: HeroComponent;
            // heroComponent = heroComponents[0].componentInstance;
            // heroComponent.delete.emit(undefined);
            (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

        });

    /**
     * Raising event on child directive
     */
    it(`should call "heroService.deleteHero" when the 
    Hero Component's delete button is clicked (3)`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // Trigger delete event on debug element
        // We do not know if child component has 'delete' event
        heroComponents[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    });

    it('should "add new hero" to the hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const name = 'Batman';
        mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 30}));
        // grab native element, not debug one so we have reference to the DOM element
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.query(By.css('.add-hero'));

        inputElement.value = name;
        // pass "null" as event object not important
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

        // Expect hero text will contain the name we created
        expect(heroText).toContain(name);
    });

});
