import { signOut } from "next-auth/react"

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import { useRouter } from 'next/router'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Container(props) {
	const router = useRouter()

	const navigation = [
		{ name: 'Home', href: '/', current: router.pathname === '/' },
		{ name: 'Archived', href: '/room/history', current: router.pathname === '/room/history' },
	]

	return (
		<>
			{/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
			<div className="min-h-full">
				<Disclosure as="nav" className="bg-gray-800">
					{({ open }) => (
						<>
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="flex items-center justify-between h-16">
									<div className="flex items-center">
										<div className="hidden md:block">
											<div className="flex items-baseline space-x-4">
												{navigation.map((item) => (
													<a
														key={item.name}
														href={item.href}
														className={classNames(
															item.current
																? 'bg-gray-900 text-white'
																: 'text-gray-300 hover:bg-gray-700 hover:text-white',
															'px-3 py-2 rounded-md text-sm font-medium'
														)}
														aria-current={item.current ? 'page' : undefined}
													>
														{item.name}
													</a>
												))}
											</div>
										</div>
									</div>
									<div className="hidden md:block">
										<div className="ml-4 flex items-center md:ml-6">
											{/* Profile dropdown */}
											<Menu as="div" className="ml-3 relative">
												<div>
													<Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
														<span className="sr-only">Open user menu</span>
														<UserIcon className="h-6 w-6 text-white" aria-hidden="true" />
													</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
														<Menu.Item>
															<span
																onClick={() => signOut()}
																className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
															>
																Sign out
															</span>
														</Menu.Item>
													</Menu.Items>
												</Transition>
											</Menu>
										</div>
									</div>
									<div className="-mr-2 flex md:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XIcon className="block h-6 w-6" aria-hidden="true" />
											) : (
												<MenuIcon className="block h-6 w-6" aria-hidden="true" />
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>

							<Disclosure.Panel className="md:hidden">
								<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
												item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
												'block px-3 py-2 rounded-md text-base font-medium'
											)}
											aria-current={item.current ? 'page' : undefined}
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
								<div className="pt-4 pb-3 border-t border-gray-700">
									<div className="px-2 space-y-1">
										<Disclosure.Button
											as="span"
											onClick={() => signOut()}
											className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
										>
											Sign out
										</Disclosure.Button>
									</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>

				<header className="bg-white shadow">
					<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold text-gray-900">Home</h1>
					</div>
				</header>
				<main>
					<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
						{props.children}
					</div>
				</main>
			</div>
		</>
	)
}
