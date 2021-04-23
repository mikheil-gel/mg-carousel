import React from 'react';
import './carousel.css';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.parentDiv = React.createRef();

    this.state = {
      slides: this.getPropsChildren(),
      change: true,
      trSlide: 'mg-car-transition',
      trDirection: '',
      trX: 0,
      start: 0,
      clX: 0,
      dif: 0,
      move: this.prevent,
      leave: this.prevent,
      end: this.prevent,
    };
  }

  prevent = (e) => {
    e.preventDefault();
  };
  preventMouse(e) {
    if (e.clientX) {
      e.preventDefault();
    }
  }

  getPropsChildren = () => {
    if (this.props.children && this.props.children.length) {
      let len = this.props.children.length - 1;
      let list = this.props.children.map((slide, id) => {
        if (len === 1) {
          if (id === 0) {
            return { slide: slide, slidePosition: 'active' };
          } else {
            return { slide: slide, slidePosition: 'next' };
          }
        } else if (len > 1) {
          if (id === 0) {
            return { slide: slide, slidePosition: 'active' };
          } else if (id === len) {
            return { slide: slide, slidePosition: 'last' };
          } else {
            return { slide: slide, slidePosition: 'next' };
          }
        } else {
          return null;
        }
      });
      return list;
    } else {
      return null;
    }
  };

  changeSlideOption = (time) => {
    setTimeout(() => {
      this.setState(() => ({
        trSlide: 'mg-car-transition',
        change: true,
      }));
    }, time);
  };

  changeSlide = (side, time) => {
    if (this.state.change) {
      let len = this.state.slides.length - 1;
      if (len === 1) {
        let newSlides = this.state.slides.map((it, id) => {
          if (it.slidePosition !== 'active') {
            return { slide: it.slide, slidePosition: 'active' };
          } else if (id === 0) {
            return { slide: it.slide, slidePosition: 'last' };
          } else if (id === 1) {
            return { slide: it.slide, slidePosition: 'next' };
          } else {
            return it;
          }
        });

        this.setState(() => ({
          slides: newSlides,
          change: false,
        }));
      } else {
        let trDir = side === 'left' ? 'mg-car-left-side' : 'mg-car-right-side';
        this.setState(() => ({
          trDirection: trDir,
        }));
        let [optionOne, optionTwo] = side === 'left' ? ['last', 'active'] : ['active', 'last'];

        let newId;
        let newSlides = this.state.slides
          .map((it, id) => {
            if (it.slidePosition === optionOne) {
              if (optionOne === 'last') {
                newId = id === 0 ? len : id - 1;
              } else if (optionOne === 'active') {
                newId = id === len ? 0 : id + 1;
              }
              return { slide: it.slide, slidePosition: optionTwo };
            } else if (it.slidePosition === optionTwo) {
              return {
                slide: it.slide,
                slidePosition: 'next',
              };
            } else {
              return it;
            }
          })
          .map((item, id) => {
            if (id === newId) {
              return { slide: item.slide, slidePosition: optionOne };
            } else {
              return item;
            }
          });

        this.setState(() => ({
          slides: newSlides,
          change: false,
        }));
      }
      this.changeSlideOption(time);
    }
  };

  scrollSlide = (classN, id) => {
    if (classN !== 'active') {
      if (this.state.change) {
        let len = this.state.slides.length - 1;
        let nextId = id === len ? 0 : id + 1;
        let lastId = id === 0 ? len : id - 1;

        let oldId;
        this.state.slides.forEach((slide, slideId) => {
          if (slide.slidePosition === 'active') {
            oldId = slideId;
          }
        });

        if (oldId === nextId) {
          this.changeSlide('left', 300);
        } else if (oldId === lastId) {
          this.changeSlide('right', 300);
        } else {
          if (oldId > id) {
            let newSlides = this.state.slides.map((it, itId) => {
              if (itId === id || itId === lastId) {
                return { slide: it.slide, slidePosition: 'last' };
              } else if (itId === oldId) {
                return it;
              } else {
                return { slide: it.slide, slidePosition: 'next' };
              }
            });

            this.setState(() => ({
              slides: newSlides,
              trSlide: '',
            }));
            setTimeout(() => {
              newSlides = newSlides.map((it, itId) => {
                if (itId === id) {
                  return { slide: it.slide, slidePosition: 'active' };
                } else if (itId === oldId) {
                  return { slide: it.slide, slidePosition: 'next' };
                } else {
                  return it;
                }
              });
              this.setState(() => ({
                trSlide: 'mg-car-transition',
                trDirection: 'mg-car-left-side',
                slides: newSlides,
              }));
            }, 1);
          } else {
            let newSlides = this.state.slides.map((it, itId) => {
              if (itId === id) {
                return { slide: it.slide, slidePosition: 'active' };
              } else if (itId === oldId) {
                return { slide: it.slide, slidePosition: 'last' };
              } else {
                return it;
              }
            });

            this.setState(() => ({
              slides: newSlides,
              trSlide: 'mg-car-transition',
              trDirection: 'mg-car-right-side',
            }));

            setTimeout(() => {
              newSlides = newSlides.map((it, itId) => {
                if (itId === id) {
                  return it;
                } else if (itId === lastId) {
                  return { slide: it.slide, slidePosition: 'last' };
                } else {
                  return { slide: it.slide, slidePosition: 'next' };
                }
              });
              this.setState(() => ({
                trSlide: '',
                slides: newSlides,
              }));
              setTimeout(() => {
                this.setState(() => ({
                  trSlide: 'mg-car-transition',
                }));
              }, 1);
            }, 300);
          }
          this.changeSlideOption(300);
        }
      }
    }
  };

  swipeStart = (e) => {
    this.setState(() => ({
      start: e.clientX || e.changedTouches[0].clientX,
      clX: e.clientX || e.changedTouches[0].clientX,
      move: this.swipeMove,
      leave: this.swipeEnd,
      end: this.swipeEnd,
      trSlide: '',
    }));

    this.preventMouse(e);
  };

  swipeMove = (e) => {
    this.setState(() => ({
      clX: e.clientX || e.changedTouches[0].clientX,
    }));
    let offWidth = this.parentDiv.current.offsetWidth;
    if (this.state.clX > this.state.start) {
      let inDif = this.state.clX - this.state.start;

      if (inDif >= offWidth) {
        this.setState(() => ({
          trX: 0,
          dif: inDif,
        }));
        this.swipeEnd(e);
      } else {
        this.setState(() => ({
          dif: inDif,
          trX: inDif,
        }));
      }
    } else if (this.state.clX < this.state.start) {
      let inDif = this.state.start - this.state.clX;
      if (inDif >= offWidth) {
        this.setState(() => ({
          trX: 0,
          dif: inDif,
        }));
        this.swipeEnd(e);
      } else {
        this.setState(() => ({
          dif: inDif,
          trX: -inDif,
        }));
      }
    }
  };

  swipeEnd = (e) => {
    this.setState(() => ({
      move: this.preventMouse,
      leave: this.prevent,
      trSlide: 'mg-car-transition',
      trDirection: '',
    }));
    let offWidth = this.parentDiv.current.offsetWidth;
    if (this.state.clX > this.state.start && this.state.dif >= offWidth * 0.075) {
      this.changeSlide('left', 1);
    } else if (this.state.clX < this.state.start && this.state.dif >= offWidth * 0.075) {
      this.changeSlide('right', 1);
    }
    this.setState(() => ({
      trX: 0,
      start: 0,
      clX: 0,
      dif: 0,
    }));
  };

  render() {
    if (!this.state.slides || this.state.slides.length === 0) {
      return (
        <div className='mg-car-slide-wrapper' ref={this.parentDiv} style={this.props.cssStyles}>
          <h1>Carousel must Contain at least 2 elements</h1>
        </div>
      );
    } else {
      let firstNext = '';
      if (this.state.slides[this.state.slides.length - 1].slidePosition === 'active') {
        firstNext = 'mg-car-first-next';
      }
      return (
        <div className='mg-car-slide-wrapper' ref={this.parentDiv} style={this.props.cssStyles}>
          <div
            className={`mg-car-slides ${this.state.trSlide}`}
            style={{ transform: `translate(${this.state.trX}px)` }}
            onMouseDown={this.swipeStart}
            onTouchStart={this.swipeStart}
            onTouchMove={this.state.move}
            onMouseMove={this.state.move}
            onTouchEnd={this.state.end}
            onMouseUp={this.swipeEnd}
            onMouseLeave={this.state.leave}
          >
            {this.state.slides.map((slide, id) => {
              return (
                <div
                  className={`mg-car-slide mg-car-${slide.slidePosition} ${this.state.trSlide} ${this.state.trDirection} ${firstNext}`}
                  key={id}
                >
                  {slide.slide}
                </div>
              );
            })}
          </div>
          <div className='mg-car-scroll-menu'>
            {this.state.slides.map((slide, id) => {
              return (
                <div
                  className={`mg-car-scroll-item mg-car-${slide.slidePosition}-item`}
                  key={id}
                  onClick={(e) => {
                    this.scrollSlide(slide.slidePosition, id);
                  }}
                ></div>
              );
            })}
          </div>

          <div
            onClick={() => {
              this.changeSlide('left', 300);
            }}
            className='mg-car-btn mg-car-btn-left'
          >
            &lt;
          </div>

          <div
            onClick={() => {
              this.changeSlide('right', 300);
            }}
            className='mg-car-btn mg-car-btn-right'
          >
            &gt;
          </div>
        </div>
      );
    }
  }
}

export default Carousel;
