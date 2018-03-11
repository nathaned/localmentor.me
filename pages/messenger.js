import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Dashboard from '../components/user/dashboard'
import Footer from '../components/footer'

const pageTitle = "Messenger";

export default () => (
	<div>
		<Head title={pageTitle} cssFiles={ ["messenger.css"] }/>
		<div className="app-container">
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<DashboardNav pageTitle={pageTitle}/>
						
						<Footer />
					</div>
				</div>
			</div>
		</div>
	</div>
)
