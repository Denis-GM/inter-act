import {FC, useRef, useState} from 'react';
import { useForm } from 'react-hook-form';

import './CreateEvent.css';
import ValidatedInput from '../../components/ValidatedInput/ValidatedInput';
import ButtonStd from '../../components/ButtonStd/ButtonStd';

const CreateEvent: FC = () => {
	const [photo, setPhoto] = useState<any>();
	const imgRef = useRef(null);
	
	const { register, handleSubmit, watch, formState: { errors } } = useForm({
		// defaultValues: {
		// 	photo: '',
		// 	title: '',
		// 	description: '',
		// 	city: '',
		// 	date: '',
		// 	time_start: '',
		// 	time_end: '',
		// }
	});

	function previewFile(data: any) {
		console.log(data.target.files[0])

		if (data.target.files && data.target.files[0]) {
			setPhoto(URL.createObjectURL(data.target.files[0]));
		}	
	
        // const file = data;
        // const reader = new FileReader();
    
        // reader.addEventListener(
        // "load",
        //     () => {
        //         let result = reader.result as string;
        //         // result = result.replace('application/octet-stream', 'image/jpg');
        //         imgRef.current!.src = result;
        //         setPhoto(reader.result)
        //     },
        //     false,
        // );
  
        // if (file) {
        //     reader.readAsDataURL(new Blob(file, { type: "image/jpg" }));
        // }
    }

	const handleLogin = (data: any) => {
		console.log(data)
	}

	const handleError = (errors: any) => {
		console.log(errors);
	};

	return(<>
		<h2 className='create-event-title'>Создание события</h2>
		<form onSubmit={handleSubmit(handleLogin, handleError)} className='create-event-form'>
			{ photo && <div className='create-event-img'>
				<img ref={imgRef} src={photo} className='block-event__img' />
            </div> }
			<div className='create-event-form-container'>
			<div style={{marginTop: '20px'}}>
				<ValidatedInput style={{margin: '5px'}}
					text="Фото" type="file"
					{...register("photo", { required: true })} 
					onChange={(e: any) => previewFile(e)} 
				/>
			</div>
			<ValidatedInput 
				text='Название мероприятия' type="text" 
				placeholder='Футбол'
				{...register("title", { required: true })} />
			<ValidatedInput text="Описание" type="text" 
				placeholder='Описание'
				{...register("description", { required: true })} />
			{/* <ValidatedInput text="Город" type="text" 
				placeholder='Описание'
				{...register("city", { required: true })} /> */}
			<div className="label">
            	<div className="text">Город</div>
				<div className="select-block">
					<select className="select" {...register("city", { required: true })}>
						<option value="Eкатеринбург">Eкатеринбург</option>
						<option value="Москва">Москва</option>
						<option value="Санкт-Петербург">Санкт-Петербург</option>
					</select>
				</div>
			</div>
			<ValidatedInput text="Дата" type="date" 
				{...register("date", { required: true })} />
			<div className='create-event-time-inputs'>
				<ValidatedInput text="Время начала" type="time" 
					placeholder='Описание'
					{...register("time_start", { required: true })} />
				<ValidatedInput text="Время окончания" type="time" 
					placeholder='Описание'
					{...register("time_end", { required: true })} />
			</div>
			<ValidatedInput text="Контакты для связи" type="text" 
				placeholder='ivan@yandex.ru'/>
			<ButtonStd type='submit'>Создать</ButtonStd>
			</div>
		</form>
	</>)
}

export default CreateEvent;