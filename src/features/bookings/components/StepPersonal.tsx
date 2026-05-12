import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalSchema } from '../schemas/booking'
import type { PersonalData } from '../schemas/booking'

interface Props {
  onNext: (data: PersonalData & { photo?: File }) => void
  onBack: () => void
  initialData?: Partial<PersonalData>
}

export const StepPersonal: React.FC<Props> = ({ onNext, onBack, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<PersonalData>({
    resolver: zodResolver(personalSchema),
    defaultValues: initialData,
  })

  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('root', { message: 'Photo must be under 5MB' })
      return
    }

    clearErrors('root')
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const onSubmit = (data: PersonalData) => {
    onNext({ ...data, photo: photo || undefined })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="booking-step-form">
      <h3>Step 2: Your Information</h3>
      <div className="form-group">
        <label>Full Name</label>
        <input {...register('name')} placeholder="John Doe" className={errors.name ? 'error' : ''} />
        {errors.name && <p className="error-msg">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" {...register('email')} placeholder="john@example.com" className={errors.email ? 'error' : ''} />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input {...register('phone')} placeholder="+250 788 000 000" className={errors.phone ? 'error' : ''} />
        {errors.phone && <p className="error-msg">{errors.phone.message}</p>}
      </div>
      <div className="form-group">
        <label>Profile Photo (Optional, max 5MB)</label>
        <input type="file" accept="image/*" onChange={handlePhoto} />
        {preview && <img src={preview} alt="Preview" className="photo-preview" />}
        {errors.root && <p className="error-msg">{errors.root.message}</p>}
      </div>
      <div className="form-actions">
        <button type="button" onClick={onBack} className="back-btn">Back</button>
        <button type="submit" className="next-btn">Continue</button>
      </div>
    </form>
  )
}
