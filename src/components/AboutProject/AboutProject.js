import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__section-title">О проекте</h2>
      <div className="about-project__description">
        <div className="about-project__column">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__main-text">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__main-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__download">
        <div className="about-project__download-section">
          <p className="about-project__download-text about-project__download-text_background-green">1 неделя</p>
          <p className="about-project__download-text">Back-end</p>
        </div>
        <div className="about-project__download-section">
          <p className="about-project__download-text about-project__download-text_background-grey">4 недели</p>
          <p className="about-project__download-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
