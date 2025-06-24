import './App.css'
import FileUpload from './components/fileUpload'
import Navbar from './components/Navbar'

function App() {

  return (
    <section className='text-center'>
      <Navbar />
      {/* <h1 className="text-4xl font-bold underline">Signature document website</h1> */}

      <FileUpload />

    </section>
  )
}

export default App
