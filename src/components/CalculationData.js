
export default function CalculationData ({ data })  {
  return (
    <div>
      <h2>Calculation Results</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};