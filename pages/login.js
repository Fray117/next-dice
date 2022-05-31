import Head from 'next/head'

import { LockClosedIcon } from '@heroicons/react/solid'

export default function Login() {
	return (
		<>
			{/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{' '}
							<a href="/signup" className="font-medium text-red-600 hover:text-red-500">
								register a new account
							</a>
						</p>
					</div>
					<form className="mt-8 space-y-6" action="#" method="POST">
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="username" className="sr-only">
									Username
								</label>
								<input
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
									placeholder="Username"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
									placeholder="Password"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								<span className="absolute left-0 inset-y-0 flex items-center pl-3">
									<LockClosedIcon className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
								</span>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
