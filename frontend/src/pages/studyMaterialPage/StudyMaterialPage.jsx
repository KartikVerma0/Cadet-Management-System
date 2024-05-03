import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import StudyMaterialBox from '../../components/studyMaterialBox/StudyMaterialBox'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './StudyMaterialPage.css'

export default function StudyMaterialPage() {
    const { auth } = useAuth()
    const [nccWing, setNccWing] = useState(auth.nccWing)
    const [studyMaterials, setStudyMaterials] = useState([])
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axiosPrivate.get(`/studymaterial?nccWing=${nccWing}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (response.data.success) {
                    setStudyMaterials(response.data.studyMaterials)
                } else {
                    console.error(response.data.message)
                }
            } catch (e) {
                console.log(e.message)
            }
        }
        getData()
    }, [auth.accessToken, nccWing])

    return (
        <div className='StudyMaterialPage'>
            <Navbar loginType='logout' />
            <h1>Study Material</h1>
            <form>
                <label htmlFor="nccWing">Select Wing:</label>
                <select defaultValue={auth.nccWing} id='nccWing' onChange={(e) => { setNccWing(e.target.value) }}>
                    <option value="All">All</option>
                    <option value="Navy" selected={auth.nccWing === 'Navy'}>Navy</option>
                    <option value="Air" selected={auth.nccWing === 'Air'}>Air</option>
                    <option value="Army" selected={auth.nccWing === 'Army'}>Army</option>
                </select>
            </form>

            <main>
                {studyMaterials.length > 0 ?
                    studyMaterials.map((material, index) => (
                        <StudyMaterialBox key={material._id} title={material.name} postedBy={material.createdBy} description={material.description} downloadUrls={material.files} position={index + 1} />
                    ))
                    :
                    <p className='errorMessage'>No study material found</p>
                }
            </main>
        </div>
    )
}