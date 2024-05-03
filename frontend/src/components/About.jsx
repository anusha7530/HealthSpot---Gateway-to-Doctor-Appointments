import React from 'react'
import aboutImg from "../assets/images/about.png";
import aboutCardImg from "../assets/images/about-card.png";
import {Link} from 'react-router-dom';

const About = () => {
  return (
    <section>
        <div className='container'>
            <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                    <img src={aboutImg} alt="about" />
                    <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%] '>
                        <img src={aboutCardImg} alt="card" />
                    </div>
                </div>

                <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                    <h2 className='heading'>Proud to be one of the best in healthcare sector</h2>
                    <p className='txt_para'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quia nulla non perspiciatis tempora cupiditate soluta exercitationem fugit vitae. Voluptates ipsam voluptatem alias itaque. Excepturi ea ab, ullam perferendis vel ut facere distinctio architecto dignissimos inventore eos iure dolore voluptatibus.
                    </p>
                    <p className='text_para mt-[30px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias veniam maxime earum totam itaque dolorum vel, dolore laudantium? Accusantium sit recusandae maiores, saepe assumenda distinctio voluptas eius labore odit sequi iusto nam dolor a numquam totam officia at tempore!</p>
                    <Link to='/'>
                        <button className="btn">Learn More</button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About
