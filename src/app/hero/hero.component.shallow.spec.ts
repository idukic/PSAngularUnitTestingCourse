import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';

describe('HeroComponent (shallow)', () => {

    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        // TestBed - can test component and its template running together
        // create module for testing
        TestBed.configureTestingModule({
            declarations: [HeroComponent] // add component that you are testing
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
});
