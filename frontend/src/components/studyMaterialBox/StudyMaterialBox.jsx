import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './StudyMaterialBox.css'

export default function StudyMaterialBox({ title, postedBy, description, downloadUrls, position }) {
    return (
        <div className={position % 3 === 1 ? 'redBg StudyMaterialBox' : position % 3 === 2 ? 'darkBlueBg StudyMaterialBox' : 'lightBlueBg StudyMaterialBox'}>
            <section className='descSection'>
                <p className='title'>{title}</p>
                <span className='postedBy'>Posted By: {postedBy}</span>
                <p className='description'>{description}</p>
            </section>
            <section className='downloadLinks'>
                {
                    downloadUrls.map((url, index) => {
                        return <Link to={url} key={url} target='_blank' className='downloadLink'>Download {downloadUrls.length > 1 ? index + 1 : ''}</Link>
                    })
                }
            </section>
        </div>
    )
}

StudyMaterialBox.propTypes = {
    title: PropTypes.string,
    postedBy: PropTypes.string,
    description: PropTypes.string,
    downloadUrls: PropTypes.array,
    position: PropTypes.number,
}