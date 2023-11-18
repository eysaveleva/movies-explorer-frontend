import './FilterCheckbox.css'

export default function FilterCheckbox({ isCheck, changeShot }) {
  return (
    <label className='search__label-container'>
      <div className='search__input-container'>
        <input className='search__ckeck' onChange={changeShot} type="checkbox"/>
        <svg className='search__check-svg' width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="smalltumb">
            <rect
              className={`search__check-svg-rect ${isCheck ? 'search__check-svg-rect_active' : ''}`}
              id="tumb__COLOR:tumbler-on" width="36" height="20" rx="10" fill="#3DDC84"
            />
            <circle
              className={`search__check-svg-circle ${isCheck ? 'search__check-svg-circle_active' : ''}`}
              id="tumb__COLOR:tumbler-on-2" cx="26" cy="10" r="8" fill="white"
            />
          </g>
        </svg>
      </div>
      <span className='search__text'>Короткометражки</span>
    </label>
  )
}
