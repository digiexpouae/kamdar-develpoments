import PositionCard from "./PositionCard";
const open=()=>{
    return(
        <div className="mb-20">
            <h2 className="text-[30px] md:text-[45px] text-center font-bold leading-tight mb-10" style={{fontFamily:'Luxerie, sans-serif'}}>Open Positions</h2>
    <div className="flex flex-wrap items-center justify-center gap-4">
                <PositionCard  head={'Senior Real Estate Agent'} text={'Lead high-value property transactions and mentor junior agents in our Manhattan office.'} />
                <PositionCard  head={'Property Manager'} text={'Oversee day-to-day property management tasks, including maintenance, tenant relations, and budget management.'} /> 
                <PositionCard  head={'Marketing Specialist'} text={'Develop and execute marketing campaigns to attract new clients and generate leads.'} /> 
                <PositionCard  head={'Financial Analyst'} text={'Analyze market trends, prepare financial reports, and provide insights to support business decisions.'} /></div>
        </div>
    )
}
export default open;