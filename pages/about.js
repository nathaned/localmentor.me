import Head from '../components/head'
import HomepageNav from '../components/public/homeNav'
import About from '../components/public/about'
import Footer from '../components/footer'

const pageTitle = "About";

export default () => (
	<div>
		<Head title={pageTitle} cssFiles={ ["about.css"] }/>
		<div className="app-container">
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<HomepageNav page={pageTitle}/>
						<About pageTitle={pageTitle}/>
						<Footer />
					</div>
				</div>
			</div>
		</div>
	</div>
)
