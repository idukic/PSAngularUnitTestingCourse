import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroComponent (shallow)', () => {

    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        // TestBed - can test component and its template running together
        // create module for testing
        TestBed.configureTestingModule({
            declarations: [HeroComponent], // add component that you are testing
            schemas: [NO_ERRORS_SCHEMA]
        });


        // Construct HeroComponent
        // Calling this function tells the TestBed to use
        // the testing module and to construct the component
        fixture = TestBed.createComponent(HeroComponent); // returnt ComponentFixture
    });

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = { id: 1, name: 'Batman', strength: 3 };
        expect(fixture.componentInstance.hero.name).toEqual('Batman');
    });

    it('should render the hero name in an anchor tag', () => {
        fixture.componentInstance.hero = { id: 1, name: 'Batman', strength: 3 };

        // prop name do not get updated until change detection runs
        // we ned to tell Angulr to implement the bindings
        fixture.detectChanges();

        const deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('Batman');
        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('Batman');
    });
});
