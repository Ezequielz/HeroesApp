import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Pruebas en <DashboardRoutes />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: { 
            logged:true,
            name:'Ezequiel'
        }
    }

    test('debe de mostrarse correctamente', () => {

        const wrapper = mount(
            <AuthContext.Provider  value={contextValue}>
                <MemoryRouter>

                     <DashboardRoutes />

                </MemoryRouter>
            </AuthContext.Provider>

        )

        expect( wrapper ).toMatchSnapshot()
        expect( wrapper.find('.text-info').text().trim() ).toBe('Ezequiel')

        
    })
    
    
})
