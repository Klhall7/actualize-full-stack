import HomeNav from "../components/homeNav";

const HomePage = () => {
    return (
        <>
            <header>
                <HomeNav />
            </header>

            <section className="problem">
                <h1>Welcome to Actualize</h1>
                <h2>Turn your goals into reality. Live intentionally.</h2>
                <h3>
                    Struggling to maintain focus and achieve your goals? Set
                    yourself up for success. Actualize is a companion for your
                    personal growth, guiding you from dream to accomplishment.
                    It helps you set deliberate goals, stay motivated, and take
                    action on what matters to you. Make it happen!
                </h3>
            </section>

            <section className="features">
                <h2>How does it work?</h2>
                <div className="feature-container" style={{ display: "flex" }}>
                    <div className="left-side">
                        <h3>Create an Account, Login and Start Creating</h3>
                    </div>
                    <div className="vl-divider"> </div>
                    <div className="right-side">
                        <p>
                            Simple or complex, Craft your goal with intention:
                        </p>
                        <ul>
                            <li>
                                Choose Your Focus: select a label that aligns
                                with your goal ( professional development,
                                fitness, health, learning etc.)
                            </li>
                            <li>
                                Give it Purpose: We give prompts to help you
                                clearly define your idea of success. This will
                                help you stay motivated.
                            </li>
                            <li>
                                Track It: We help you track your progress with
                                whatever measure you set. Set deadlines, or
                                track consistency (daily, weekly etc.).
                            </li>
                            <li>
                                Plan Your Path to Achievement: Start creating
                                steps. Make a list of tasks and check them off
                                for satisfaction or start with one task and
                                build from there.
                            </li>
                            <li>
                                Adapt as Needed: We keep it flexible. You can
                                revise your goals and tasks anytime.
                            </li>
                            <li>
                                Reflections: we prompt you to reflect on your
                                progress. This will help you with self awareness
                                and identify any influences on your
                                productivity.
                            </li>
                        </ul>
                    </div>
                </div>
                <p>
                    The app will maintain a clear record of your completed goals
                    and progress in a central location.
                </p>
            </section>

            <section className="take-action">
                <p>
                    Stop feeling overwhelmed. Take control and start reaching
                    your full potential!
                </p>
                <button onClick={() => (window.location.href = "/register")}>
                    Get Started Now
                </button>
            </section>
        </>
    );
};
export default HomePage;
