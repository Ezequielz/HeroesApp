import React from 'react';
import { mount } from "enzyme"
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: { 
            logged:false
        }
    }

    test('debe de mostrar login si no esta autenticado', () => {
        
        const wrapper = mount( 
            <AuthContext.Provider value={ contextValue } >

                <AppRouter />

            </AuthContext.Provider>
         );

         expect( wrapper ).toMatchSnapshot()
         expect(wrapper.find('nav').exists()).toBe(false)


    })

    test('debe de mostrar el componente marvel si esta autenticado', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: { 
                logged:true,
                name: 'Ezequiel'
            }
        }

        const wrapper = mount( 
            <AuthContext.Provider value={ contextValue } >

                <AppRouter  />

            </AuthContext.Provider>
         );
            expect(wrapper.find('nav').exists()).toBe(true)
        //  expect( wrapper.find('span').exists() ).toBe( true )

    })
    
    
    
})
