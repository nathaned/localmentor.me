import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Homepage from '../components/homepage'
import Footer from '../components/footer'

export default () => (
	<div>
		<Head title="Home" cssFiles={ ["homepage.css"] }/>
		<div className="app-container">
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<Nav page="home"/>

						<Homepage />
						<Footer />
					</div>
				</div>
			</div>
		</div>
	</div>
)
