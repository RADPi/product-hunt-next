import React, { useState } from 'react'
import { Router } from 'next/router'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Layout from '../components/layout/Layout'
import {
	Campo,
	Error,
	Formulario,
	InputSubmit,
} from '../components/ui/Formulario'
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'
import firebase from '../firebase'

export default function CrearCuenta() {
	const STATE_INICIAL = {
		nombre: '',
		email: '',
		password: '',
	}

	const [error, setError] = useState(false)

	const { valores, errores, handleSubmit, handleChange, handleBlur } =
		useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta)

	const { nombre, email, password } = valores

	async function crearCuenta() {
		try {
			await firebase.registrar(nombre, email, password)
			// Router.push('/')
		} catch (error) {
			console.error('Hubo un error al crear el usuario ', error.message)
			setError(error.message)
		}
	}

	return (
		<div>
			<Layout>
				<>
					<h1
						css={css`
							text-align: center;
							margin-top: 5rem;
						`}
					>
						CrearCuenta
					</h1>
					<Formulario onSubmit={handleSubmit} noValidate>
						<Campo>
							<label htmlFor='nombre'>Nombre</label>
							<input
								type='text'
								name='nombre'
								id='nombre'
								placeholder='Tu Nombre'
								value={nombre}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>
						{errores.nombre && <Error>{errores.nombre}</Error>}

						<Campo>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Tu Email'
								value={email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>
						{errores.email && <Error>{errores.email}</Error>}

						<Campo>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='Tu Password'
								value={password}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>
						{errores.password && <Error>{errores.password}</Error>}

						<InputSubmit type='submit' value='Crear Cuenta' />
					</Formulario>
				</>
			</Layout>
		</div>
	)
}
