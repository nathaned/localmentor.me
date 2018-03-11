import Head from '../components/head'
import HomepageNav from '../components/public/homeNav'
import Contact from '../components/public/contact'
import Footer from '../components/footer'

const pageTitle = "Contact";

export default () => (
	<div>
		<Head title={pageTitle} cssFiles={ ["contact.css"] }/>
		<div className="app-container">
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<HomepageNav page={pageTitle}/>
						<Contact pageTitle={pageTitle}/>
						<Footer />
					</div>
				</div>
			</div>
		</div>
	</div>
)
