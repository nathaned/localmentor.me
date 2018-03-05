import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Homepage from '../components/homepage'
import Footer from '../components/footer'

export default () => (
	<div>
		<Head title="Home" css="homepage.css"/>
		<div className="app-container">
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<Nav />

						<Homepage />
						<Footer />
					</div>
				</div>
			</div>
		</div>
	</div>
)
