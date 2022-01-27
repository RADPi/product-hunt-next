import React, { useState } from 'react'
import Router from 'next/router'
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
import validarIniciarSesion from '../validacion/validarIniciarSesion'
import firebase from '../firebase'

const STATE_INICIAL = {
	email: '',
	password: '',
}

export default function Login() {
	const [error, setError] = useState(false)

	const { valores, errores, handleSubmit, handleChange, handleBlur } =
		useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion)

	const { email, password } = valores

	async function iniciarSesion() {
		try {
			await firebase.login(email, password)
			Router.push('/')
		} catch (error) {
			console.error('Hubo un error al autenticar el usuario ', error.message)
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
						Iniciar Sesion
					</h1>
					<Formulario onSubmit={handleSubmit} noValidate>
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

						{error && <Error>{error}</Error>}

						<InputSubmit type='submit' value='Iniciar Sesión' />
					</Formulario>
				</>
			</Layout>
		</div>
	)
}
