import Head from '../components/head'
import DashboardNav from '../components/user/dashboardNav'
import Footer from '../components/footer'
import Dashboard from '../components/user/dashboard'
import MentorList from '../components/user/mentorList'
import SearchBar from '../components/user/searchBar'

const pageTitle = "Find a Mentor";

export default () => (
	<div>
		<Head title="Dashboard" cssFiles={ ["dashboard.css"] }/>
		<div className="app-container">
			<div className="site-wrapper">


				<div className="site-wrapper-inner">

					<div className="cover-container">

						<DashboardNav pageTitle={pageTitle}/>

						<div id = "whaterver-you-want-to-call-that-id">
							FIND A MENTOR
						</div>

						<div className = "search-bar">

							<SearchBar />

						</div>

						<div className = "mentor-list">

							<MentorList />
						</div>


						<Footer />
					</div>


				</div>
			</div>
		</div>
	</div>
)
