import streamlit as st
import os
import sys
import io
import contextlib
from pathlib import Path

# Set page configuration
st.set_page_config(page_title="DCodex", page_icon="🐍", layout="wide")

# Custom CSS for some basic Streamlit tweaks (like hiding default main menu if desired, though Streamlit theme handles colors)
st.markdown("""
    <style>
    .stButton>button {
        border-radius: 20px;
        font-weight: bold;
    }
    .project-card {
        padding: 20px;
        border: 2px solid #FF6B35;
        border-radius: 10px;
        margin-bottom: 20px;
        background-color: #FFFFFF;
    }
    </style>
""", unsafe_allow_html=True)

# Helper to redirect stdout
@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = io.StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old

# Navigation
page = st.sidebar.radio("Navigation", ["Home", "Projects", "Run Code", "About", "Contact"])

# Projects list
PROJECTS_DIR = Path("projects")
available_projects = []
if PROJECTS_DIR.exists():
    available_projects = [f.name for f in PROJECTS_DIR.glob("*.py")]

if page == "Home":
    st.title("DCodex - Learn Python by Doing")
    st.subheader("Code. Run. Learn. Repeat.")
    st.write("Welcome to DCodex! The ultimate student-friendly platform to learn Python.")
    
    st.markdown("### Featured Python Projects")
    cols = st.columns(3)
    for idx, proj in enumerate(available_projects):
        with cols[idx % 3]:
            st.markdown(f"""
            <div class="project-card">
                <h4 style='color: #FF6B35;'>{proj.replace('_', ' ').replace('.py', '').title()}</h4>
                <p style='color: #000000;'>Explore this beginner-friendly Python project.</p>
            </div>
            """, unsafe_allow_html=True)
            if st.button("View Code", key=f"btn_{proj}"):
                st.session_state['selected_code_file'] = proj
                st.info(f"Go to 'Run Code' from the sidebar to play with {proj}!")

elif page == "Projects":
    st.title("Projects & Learning Area")
    st.write("Here you can browse through the notes and projects created for your learning.")
    
    if not available_projects:
        st.write("No projects found. Please add some python files to the `projects` folder.")
    else:
        for proj in available_projects:
            with st.expander(proj.replace('_', ' ').replace('.py', '').title()):
                code = (PROJECTS_DIR / proj).read_text(encoding='utf-8')
                st.code(code, language='python')
                
                # Setup download button
                st.download_button(
                    label="Download Project",
                    data=code,
                    file_name=proj,
                    mime="text/x-python",
                    key=f"dl_{proj}"
                )

elif page == "Run Code":
    st.title("Interactive Code Editor")
    
    st.info("💡 Note: Interactive `input()` functions (like the ones in your games) are currently not supported in the live web editor and will throw an EOFError. You can download the scripts to run them in your local terminal, or write non-interactive Python code below to test!")
    
    default_code = "print('Hello, DCodex!')"
    
    # Check if a project was selected from the Home page
    if 'selected_code_file' in st.session_state:
        proj_name = st.session_state['selected_code_file']
        try:
            default_code = (PROJECTS_DIR / proj_name).read_text(encoding='utf-8')
            st.success(f"Loaded: {proj_name}")
        except Exception as e:
            st.error("Could not load project.")

    user_code = st.text_area("Write your Python code here:", value=default_code, height=300)
    
    if st.button("Run Code", type="primary"):
        st.write("### Output:")
        with stdoutIO() as s:
            try:
                # We execute the code. Note: input() will fail here with EOFError.
                exec(user_code)
            except EOFError:
                print("\n[ERROR] Interactive input() is not supported in this web editor.")
            except Exception as e:
                print(f"\n[ERROR] {e}")
        
        st.code(s.getvalue(), language="text")

elif page == "About":
    st.title("About DCodex")
    st.write("DCodex is built to provide an easy and interactive way to learn Python. With a focus on learning by doing, students can view real projects and write their own code right in the browser.")

elif page == "Contact":
    st.title("Contact")
    st.write("Have questions? Reach out to us!")
    st.text_input("Name")
    st.text_input("Email")
    st.text_area("Message")
    if st.button("Send Message", type="primary"):
        st.success("Message sent successfully!")
