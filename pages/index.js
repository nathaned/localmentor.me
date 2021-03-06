import Head from '../components/head'
import HomeNav from '../components/public/homeNav'
import Homepage from '../components/public/homepage'
import Footer from '../components/footer'

export default () => (
	<div>
		<Head title="Home" cssFiles={ ["homepage.css"] }/>
		<div className="app-container">
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<HomeNav page="home"/>

						<Homepage />
						<Footer />
					</div>
				</div>
			</div>
		</div>
	</div>
)
