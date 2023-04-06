module.exports = {
  expandProps: 'end',
  svgo: false,
  replaceAttrValues: {
    // In React.js all props forwarded to the <svg> tag must be lowercase only.
    // Color Palette props pulled from OUColors for themed multi-color svgs.
    grey: '{props.grey}',
    circleFill: '{props.circleFill}',
    brightSkyBlue: '{props.brightSkyBlue}',
    brandAlt: '{props.brandAlt}',
    crystalContrast: '{props.crystalContrast}',
    brand: '{props.brand}',
    brandLight: '{props.brandLight}',
    textContrast: '{props.textContrast}',
    darkContrast: '{props.darkContrast}',
    larchYellowHover: '{props.larchyellowhover}',
    larchYellowPressed: '{props.larchyellowpressed}',
    glacialBlue: '{props.glacialblue}',
    paintbrushRed: '{props.paintbrushred}',
    obsidian: '{props.obsidian}',
    basalt: '{props.basalt}',
    granite: '{props.granite}',
    limestone: '{props.limestone}',
    quartz: '{props.quartz}',
    crystal: '{props.crystal}',
    crystalHover: '{props.crystalhover}',
    crystalPressed: '{props.crystalpressed}',
    disabled: '{props.disabled}',
    overlay: '{props.overlay}',
    // Tint color props for mono-color svgs.
    tintColor: '{props.tintcolor}',
  },
}
