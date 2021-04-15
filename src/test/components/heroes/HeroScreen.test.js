import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';


describe('Pruebas en <HeroScreen />', () => {

    const history= {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn() 
    }

    
    test('debe de mostrar el componente redirect si no hay argumentows en el url', () => {
        
        const wrapper = mount( 
            <MemoryRouter  initialEntries={['/hero']}>
    
                <HeroScreen history={ history }  /> 
    
            </MemoryRouter>
        )
        expect( wrapper.find('Redirect').exists() ).toBe(true)
        
    })

    test('debe de mostrar un hero si el parametro existe y lo encuentra', () => {

        const wrapper = mount(
            <MemoryRouter  initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe(true)
        
    })

    test('debe de regresar a la pantalla anterior con PUSH', () => {

        const history= {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn() 
        }

        const wrapper = mount(
            <MemoryRouter  initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')()

        expect( history.push ).toHaveBeenCalledWith('/')
        expect( history.goBack ).not.toHaveBeenCalled()
        
    })

    test('debe de regresar a la pantalla anterior GOBACK', () => {
        
        const wrapper = mount(
            <MemoryRouter  initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')()

        expect( history.goBack ).toHaveBeenCalledWith()

        //1
        expect( history.push ).not.toHaveBeenCalledWith('/')
        //2 o lo mismo asi
        expect( history.push ).toHaveBeenCalledTimes(0)
           
            

    })
    
    test('debe de llamar el Redirect si el hero no existe', () => {

        const wrapper = mount(
            <MemoryRouter  initialEntries={['/hero/marvel-NOEXISTE']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('')

        
    })
    
    
    
    
})
