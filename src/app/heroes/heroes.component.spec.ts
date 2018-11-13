// Isolated Unit Test

import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/internal/observable/of';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Dr IQ', strength: 4 },
            { id: 2, name: 'Magma', strength: 18 },
            { id: 3, name: 'Tornado', strength: 15 }
        ];
    });

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);

    describe('delete', () => {
        // state based test
        it('should remove the indicated hero from the heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(component.heroes.length).toBe(2);
        });

        // interaction test
        it('should call deleteHero with specific parameter', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES; // or call component.ngOnInit()
            component.delete(HEROES[2]);
            // make sure deleteHero itself was called
            expect(mockHeroService.deleteHero).toHaveBeenCalled();

            // make sure deleteHero itself was called with specific paramater
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });


});
