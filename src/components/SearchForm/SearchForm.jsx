import { useState } from 'react'
import useFormValidation from '../../hooks/useFormValidation'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

export default function SearchForm({ isCheck, changeShot }) {
  const [isError,setIsError] = useState(false)
  const {values, isValid, handleChange} = useFormValidation()

  function onSubmit(evt) {
    evt.preventDefault()
    if (!isValid) {
      setIsError(true)
      return
    } else {
      setIsError(false)
    }
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form' noValidate name={'SearchForm'} value={values.search} onSubmit={onSubmit}>
          <div className='search__line'>
          <input className='search__input' type="text" placeholder='Фильм' required onChange={handleChange}/>
          <button className='search__submit' type="submit"></button>
          </div>
        <span className={`search__error ${isError && 'search__error_active'}`}>{isError ? 'Введите ключевое слово' : '.'}</span>
        <FilterCheckbox isCheck={isCheck} changeShot={changeShot}/>
        </form>
      </div>
    </section>
  )
}
